"use server"

import { emailFormSchema } from "@/lib/schema"
import { z } from "zod"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const htmlTemplate = `
<!doctype html>
<html lang="en">
  <head>
    <title></title>
    <!--[if !mso]><!-- -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style type="text/css">
      #outlook a {
        padding: 0;
      }
      .ReadMsgBody {
        width: 100%;
      }
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass * {
        line-height: 100%;
      }
      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table,
      td {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
      p {
        display: block;
        margin: 13px 0;
      }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
      @media only screen and (max-width: 480px) {
        @-ms-viewport {
          width: 320px;
        }
        @viewport {
          width: 320px;
        }
      }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <!--[if lte mso 11]>
      <style type="text/css">
        .outlook-group-fix {
          width: 100% !important;
        }
      </style>
    <![endif]-->
    <style type="text/css">
      @media only screen and (min-width: 480px) {
        .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
      }
    </style>
    <style type="text/css">
      @media only screen and (max-width: 480px) {
        table.full-width-mobile {
          width: 100% !important;
        }
        td.full-width-mobile {
          width: auto !important;
        }
      }
    </style>
    <style type="text/css">
      h1 {
        font-family: -apple-system, system-ui, BlinkMacSystemFont;
        font-size: 24px;
        font-weight: 600;
        line-height: 24px;
        text-align: left;
        color: #333333;
        padding-bottom: 18px;
      }

      p {
        font-family: -apple-system, system-ui, BlinkMacSystemFont;
        font-size: 15px;
        font-weight: 300;
        line-height: 24px;
        text-align: left;
        color: #333333;
      }

      a {
        color: #0867ec;
        font-weight: 400;
      }
      a.footer-link {
        color: #888888;
      }
      strong {
        font-weight: 500;
      }
    </style>
  </head>
  <body style="background-color: #ffffff">
    <div
      style="
        display: none;
        font-size: 1px;
        color: #ffffff;
        line-height: 1px;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
      "
    >

    </div>
    <div style="background-color: #ffffff">
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div
        style="
          background: #ffffff;
          background-color: #ffffff;
          margin: 0px auto;
          max-width: 600px;
        "
      >
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background: #ffffff; background-color: #ffffff; width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  text-align: center;
                  vertical-align: top;
                "
              >
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                <div
                  class="mj-column-per-100 outlook-group-fix"
                  style="
                    font-size: 13px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          font-size: 0px;
                          padding: 10px 25px;
                          padding-top: 24px;
                          padding-bottom: 24px;
                          word-break: break-word;
                        "
                      >
                        <div
                          style="
                            font-family:
                              -apple-system, system-ui, BlinkMacSystemFont;
                            font-size: 15px;
                            font-weight: 300;
                            line-height: 24px;
                            text-align: left;
                            color: #333333;
                          "
                        >
                          <h1>{sub}</h1>
<p>{content}</p>

                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        align="left"
                        style="
                          font-size: 0px;
                          padding: 10px 25px;
                          word-break: break-word;
                        "
                      >
                        <div
                          style="
                            font-family:
                              -apple-system, system-ui, BlinkMacSystemFont;
                            font-size: 15px;
                            font-weight: 300;
                            line-height: 24px;
                            text-align: left;
                            color: #333333;
                          "
                        >
                          Best,<br />
                          <strong>Evan</strong>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          font-size: 0px;
                          padding: 10px 25px;
                          word-break: break-word;
                        "
                      >
                        <p
                          style="
                            border-top: solid 1px #e8e8e8;
                            font-size: 1;
                            margin: 0px auto;
                            width: 100%;
                          "
                        ></p>
                        <!--[if mso | IE
                          ]><table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            style="
                              border-top: solid 1px #e8e8e8;
                              font-size: 1;
                              margin: 0px auto;
                              width: 550px;
                            "
                            role="presentation"
                            width="550px"
                          >
                            <tr>
                              <td style="height: 0; line-height: 0">&nbsp;</td>
                            </tr>
                          </table><!
                        [endif]-->
                      </td>
                    </tr>
                    <tr>
                      <td
                        align="left"
                        style="
                          font-size: 0px;
                          padding: 10px 25px;
                          word-break: break-word;
                        "
                      >
                        <div
                          style="
                            font-family:
                              -apple-system, system-ui, BlinkMacSystemFont;
                            font-size: 12px;
                            font-weight: 300;
                            line-height: 24px;
                            text-align: left;
                            color: #888888;
                          "
                        >
                          © 2025 Evan Huang
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        align="left"
                        style="
                          font-size: 0px;
                          padding: 10px 25px;
                          word-break: break-word;
                        "
                      >
                        <div
                          style="
                            font-family:
                              -apple-system, system-ui, BlinkMacSystemFont;
                            font-size: 12px;
                            font-weight: 300;
                            line-height: 24px;
                            text-align: left;
                            color: #888888;
                          "
                        >
                          For questions contact <a
                            href="mailto:evan.huang000@proton.me"
                            class="footer-link"
                            >evan.huang000@proton.me</a
                          >
                        </div>
                      </td>
                    </tr>

                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
    </div>
  </body>
</html>
`

export async function sendEmailAction(_prevState: unknown, formData: FormData) {
  const defaultValues = z.record(z.string(), z.string()).parse(Object.fromEntries(formData.entries()))

  try {
    console.log("Parsing form data...")
    const data = emailFormSchema.parse({
      ...Object.fromEntries(formData.entries()),
      isHtml: formData.get("isHtml") === "true",
      useHtmlTemplate: formData.get("useHtmlTemplate") === "true",
      attachment: formData.get("attachment"),
    })

    console.log("Form data parsed successfully:", data)

    // Send email using Resend
    const { nickname, domainPrefix, email, subject, message, isHtml, useHtmlTemplate, attachment } = data

    let htmlContent: string | undefined
    let textContent: string | undefined

    if (isHtml) {
      htmlContent = message
    } else if (useHtmlTemplate) {
      htmlContent = htmlTemplate.replace("{sub}", subject).replace("{content}", message)
    } else {
      textContent = message
    }

    const emailData: any = {
      from: `${nickname} <${domainPrefix}@${process.env.DOMAIN}>`,
      to: email,
      subject: subject,
      html: htmlContent,
      text: textContent,
    }

    if (attachment instanceof File) {
      const buffer = await attachment.arrayBuffer()
      emailData.attachments = [
        {
          filename: attachment.name,
          content: Buffer.from(buffer),
        },
      ]
    }

    console.log("Sending email with data:", emailData)
    const result = await resend.emails.send(emailData)
    console.log("Email sent successfully:", result)

    return {
      defaultValues: {
        nickname: "",
        domainPrefix: "",
        email: "",
        subject: "",
        message: "",
      },
      success: true,
      errors: null,
    }
  } catch (error) {
    console.error("Error in sendEmailAction:", error)
    if (error instanceof z.ZodError) {
      return {
        defaultValues,
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [key, value?.join(", ")]),
        ),
      }
    }

    return {
      defaultValues,
      success: false,
      errors: {
        form: error instanceof Error ? error.message : "Failed to send email. Please try again.",
      },
    }
  }
}

