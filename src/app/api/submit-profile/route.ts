import { NextResponse } from "next/server";
import { sanityWriteClient } from "@/sanity/client";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let fullName = "";
    let email = "";
    let whatsapp = "";
    let preferredContactMethod = "whatsapp";
    let roleTitle = "";
    let category = "";
    let experienceYears = "";
    let location = "";
    let workPreference = "";
    let highlightMetric = "";
    let skills = "";
    let bio = "";
    let portfolioUrl = "";
    let githubUrl = "";
    let linkedinUrl = "";
    let avatarAsset: any = null;
    let coverAsset: any = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      fullName = (formData.get("fullName") as string) || "";
      email = (formData.get("email") as string) || "";
      whatsapp = (formData.get("whatsapp") as string) || "";
      preferredContactMethod = (formData.get("preferredContactMethod") as string) || "whatsapp";
      roleTitle = (formData.get("roleTitle") as string) || "";
      category = (formData.get("category") as string) || "";
      experienceYears = (formData.get("experienceYears") as string) || "";
      location = (formData.get("location") as string) || "";
      workPreference = (formData.get("workPreference") as string) || "";
      highlightMetric = (formData.get("highlightMetric") as string) || "";
      skills = (formData.get("skills") as string) || "";
      bio = (formData.get("bio") as string) || "";
      portfolioUrl = (formData.get("portfolioUrl") as string) || "";
      githubUrl = (formData.get("githubUrl") as string) || "";
      linkedinUrl = (formData.get("linkedinUrl") as string) || "";

      const avatarFile = formData.get("avatar") as File | null;
      if (avatarFile && avatarFile.size > 0 && typeof avatarFile.arrayBuffer === "function") {
        const buffer = Buffer.from(await avatarFile.arrayBuffer());
        const uploadedAvatar = await sanityWriteClient.assets.upload("image", buffer, {
          filename: avatarFile.name || "talent-avatar",
          contentType: avatarFile.type || "image/jpeg",
        });
        avatarAsset = {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: uploadedAvatar._id,
          },
        };
      }

      const coverFile = formData.get("coverImage") as File | null;
      if (coverFile && coverFile.size > 0 && typeof coverFile.arrayBuffer === "function") {
        const buffer = Buffer.from(await coverFile.arrayBuffer());
        const uploadedCover = await sanityWriteClient.assets.upload("image", buffer, {
          filename: coverFile.name || "talent-cover",
          contentType: coverFile.type || "image/jpeg",
        });
        coverAsset = {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: uploadedCover._id,
          },
        };
      }
    } else {
      const body = await request.json();
      fullName = body.fullName || "";
      email = body.email || "";
      whatsapp = body.whatsapp || "";
      preferredContactMethod = body.preferredContactMethod || "whatsapp";
      roleTitle = body.roleTitle || "";
      category = body.category || "";
      experienceYears = body.experienceYears || "";
      location = body.location || "";
      workPreference = body.workPreference || "";
      highlightMetric = body.highlightMetric || "";
      skills = body.skills || "";
      bio = body.bio || "";
      portfolioUrl = body.portfolioUrl || "";
      githubUrl = body.githubUrl || "";
      linkedinUrl = body.linkedinUrl || "";
    }

    if (!fullName || !email || !roleTitle || !skills || !bio) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: fullName, email, roleTitle, skills, and bio are all required.",
        },
        { status: 400 }
      );
    }

    // Create the profile submission document in Sanity with status "pending"
    const doc: any = {
      _type: "profileSubmission",
      fullName,
      email,
      whatsapp,
      preferredContactMethod,
      roleTitle,
      category,
      experienceYears,
      location,
      workPreference,
      highlightMetric,
      skills,
      bio,
      portfolioUrl,
      githubUrl,
      linkedinUrl,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    if (avatarAsset) {
      doc.avatar = avatarAsset;
    }
    if (coverAsset) {
      doc.coverImage = coverAsset;
    }

    const result = await sanityWriteClient.create(doc);

    // Forward to Formspree for instant email delivery to traxnewsng@gmail.com
    try {
      await fetch("https://formspree.io/f/xbgjbpba", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: `[Trax Jobs] Direct Talent Profile: ${fullName} - ${roleTitle}`,
          fullName,
          roleTitle,
          email,
          _replyto: email,
          whatsapp,
          preferredContactMethod,
          category,
          experienceYears,
          location,
          workPreference,
          highlightMetric,
          skills,
          bio,
          portfolioUrl,
          githubUrl,
          linkedinUrl,
          sanityId: result._id,
          submittedAt: new Date().toISOString(),
          source: "Direct API Submission (/api/submit-profile)",
        }),
      });
    } catch (notifyErr) {
      console.error("Formspree forward error (profile):", notifyErr);
    }

    return NextResponse.json(
      { success: true, id: result._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Profile submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit profile. Please try again." },
      { status: 500 }
    );
  }
}
