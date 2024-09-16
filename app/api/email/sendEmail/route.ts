import { transporter, mailOptions } from "@/utils/nodemailerConfig";

type contactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const CONTACT_MESSAGE_FIELDS: contactMessage = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
};

const generateEmailContent = () => {
  const htmlData = `<h3 class="form-heading" align="left">Philip mathew</p>`;

  return {
    text: "this is just a test",
    html: `
      <!DOCTYPE html>
        <html>

        <head>
            <title></title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <style type="text/css">
              @media screen and (max-width: 600px) {
                .content {
                    width: 100% !important;
                    display: block !important;
                    padding: 10px !important;
                }
                .header, .body, .footer {
                    padding: 20px !important;
                }
              }
            </style>
        </head>

        <body style="font-family: 'Poppins', Arial, sans-serif">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                  <td align="center" style="padding: 20px;">
                      <table class="content" width="600" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: 1px solid #cccccc;">
                          <!-- Header -->
                          <tr>
                              <td class="header" style="background-color: #345C72; padding: 40px; text-align: center; color: white; font-size: 24px;">
                                TaskFlow Team
                              </td>
                          </tr>

                          <!-- Body -->
                          <tr>
                              <td class="body" style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;">
                                Hello, All! <br>
                                Lorem odio soluta quae dolores sapiente voluptatibus recusandae aliquam fugit ipsam.
                                <br><br>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam corporis sint eum nemo animi velit exercitationem impedit. Incidunt, officia facilis  atque? Ipsam voluptas fugiat distinctio blanditiis veritatis.            
                              </td>
                          </tr>
                          <tr>
                              <td class="body" style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;">
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam corporis sint eum nemo animi velit exercitationem impedit.             
                              </td>
                          </tr>
                          <!-- Footer -->
                          <tr>
                              <td class="footer" style="background-color: #333333; padding: 40px; text-align: center; color: white; font-size: 14px;">
                              Copyright &copy; 2024 | TaskFlow
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>

      </html>`,
  };
};

export async function GET(req: Request) {
  const data = req.body;

  try {
    await transporter.sendMail({
      ...mailOptions,
      ...generateEmailContent(),
      subject: "This is just a test",
    });

    return Response.json({ success: true });
  } catch (err) {
    console.log(err);
    return Response.json({ message: err });
  }
}
