import { NextResponse } from "next/server";
import { sanityWriteClient } from "@/sanity/client";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let companyName = "";
    let contactEmail = "";
    let jobTitle = "";
    let roleCategory = "";
    let workplaceType = "";
    let location = "";
    let salaryRange = "";
    let applicationLink = "";
    let description = "";
    let requirements = "";
    let logoAsset: any = null;
    let coverAsset: any = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      companyName = (formData.get("companyName") as string) || "";
      contactEmail = (formData.get("contactEmail") as string) || "";
      jobTitle = (formData.get("jobTitle") as string) || "";
      roleCategory = (formData.get("roleCategory") as string) || "";
      workplaceType = (formData.get("workplaceType") as string) || "";
      location = (formData.get("location") as string) || "";
      salaryRange = (formData.get("salaryRange") as string) || "";
      applicationLink = (formData.get("applicationLink") as string) || "";
      description = (formData.get("description") as string) || "";
      requirements = (formData.get("requirements") as string) || "";

      const logoFile = formData.get("logo") as File | null;
      if (logoFile && logoFile.size > 0 && typeof logoFile.arrayBuffer === "function") {
        const buffer = Buffer.from(await logoFile.arrayBuffer());
        const uploadedAsset = await sanityWriteClient.assets.upload("image", buffer, {
          filename: logoFile.name || "company-logo",
          contentType: logoFile.type || "image/png",
        });
        logoAsset = {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: uploadedAsset._id,
          },
        };
      }

      const coverFile = formData.get("coverImage") as File | null;
      if (coverFile && coverFile.size > 0 && typeof coverFile.arrayBuffer === "function") {
        const buffer = Buffer.from(await coverFile.arrayBuffer());
        const uploadedCover = await sanityWriteClient.assets.upload("image", buffer, {
          filename: coverFile.name || "company-cover",
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
      companyName = body.companyName || "";
      contactEmail = body.contactEmail || "";
      jobTitle = body.jobTitle || "";
      roleCategory = body.roleCategory || "";
      workplaceType = body.workplaceType || "";
      location = body.location || "";
      salaryRange = body.salaryRange || "";
      applicationLink = body.applicationLink || "";
      description = body.description || "";
      requirements = body.requirements || "";
    }

    if (!companyName || !contactEmail || !jobTitle || !applicationLink) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: companyName, contactEmail, jobTitle, and applicationLink are all required.",
        },
        { status: 400 }
      );
    }

    // Create the job submission document in Sanity with status "pending"
    const doc: any = {
      _type: "jobSubmission",
      companyName,
      contactEmail,
      jobTitle,
      roleCategory,
      workplaceType,
      location,
      salaryRange,
      applicationLink,
      description,
      requirements,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    if (logoAsset) {
      doc.logo = logoAsset;
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
          _subject: `[Trax Jobs] Direct Job Submission: ${jobTitle} at ${companyName}`,
          companyName,
          jobTitle,
          contactEmail,
          _replyto: contactEmail,
          roleCategory,
          workplaceType,
          location,
          salaryRange,
          applicationLink,
          description,
          requirements,
          sanityId: result._id,
          submittedAt: new Date().toISOString(),
          source: "Direct API Submission (/api/submit-job)",
        }),
      });
    } catch (notifyErr) {
      console.error("Formspree forward error (job):", notifyErr);
    }

    return NextResponse.json(
      { success: true, id: result._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Job submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit job. Please try again." },
      { status: 500 }
    );
  }
}
