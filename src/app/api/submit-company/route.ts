import { NextResponse } from "next/server";
import { sanityWriteClient } from "@/sanity/client";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let name = "";
    let contactEmail = "";
    let industry = "";
    let location = "";
    let website = "";
    let employeesCount = "";
    let accentColor = "#E7040D";
    let description = "";
    let logoAsset: any = null;
    let coverAsset: any = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      name = (formData.get("name") as string) || "";
      contactEmail = (formData.get("contactEmail") as string) || "";
      industry = (formData.get("industry") as string) || "";
      location = (formData.get("location") as string) || "";
      website = (formData.get("website") as string) || "";
      employeesCount = (formData.get("employeesCount") as string) || "";
      accentColor = (formData.get("accentColor") as string) || "#E7040D";
      description = (formData.get("description") as string) || "";

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
      name = body.name || "";
      contactEmail = body.contactEmail || "";
      industry = body.industry || "";
      location = body.location || "";
      website = body.website || "";
      employeesCount = body.employeesCount || "";
      accentColor = body.accentColor || "#E7040D";
      description = body.description || "";
    }

    if (!name || !contactEmail) {
      return NextResponse.json(
        { error: "Missing required fields: Company Name and Contact Email are required." },
        { status: 400 }
      );
    }

    const slugCurrent = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const doc: any = {
      _type: "companySubmission",
      name,
      slug: { _type: "slug", current: slugCurrent },
      contactEmail,
      industry,
      location,
      website,
      employeesCount,
      accentColor,
      description,
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

    // Forward notification to Formspree for instant admin alerts
    try {
      await fetch("https://formspree.io/f/xbgjbpba", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: `[Trax Jobs] New Company Registration: ${name}`,
          name,
          contactEmail,
          _replyto: contactEmail,
          industry,
          location,
          website,
          employeesCount,
          description,
          sanityId: result._id,
          submittedAt: new Date().toISOString(),
          source: "Direct API Submission (/api/submit-company)",
        }),
      });
    } catch (notifyErr) {
      console.error("Formspree forward error (company):", notifyErr);
    }

    return NextResponse.json(
      { success: true, id: result._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Company submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit company profile. Please try again." },
      { status: 500 }
    );
  }
}
