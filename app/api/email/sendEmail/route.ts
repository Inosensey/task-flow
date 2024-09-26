import { encrypt, decrypt } from "@/utils/crypto";

import { routeHandlerSupabaseIns } from "@/utils/supabaseUtils";
import { transporter, mailOptions } from "@/utils/nodemailerConfig";
import { formatHourTo12, getCurrentDate } from "@/utils/useDate";

interface scheduleType {
  firstName: string;
  lastName: string;
  email: string;
  scheduleList: [
    { title: string; timeStart: string; timeEnd: string; description: string }
  ];
}

const generateEmailContent = (schedulesData: scheduleType) => {
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
                      <table class="content" width="600" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: 1px solid #222831;">
                          <!-- Header -->
                          <tr>
                              <td class="header" style="background-color: #222831; padding: 40px; text-align: center; color: white; font-size: 24px;">
                                <span style="color: #00ADB5;">TaskFlow</span> Team
                              </td>
                          </tr>

                          <!-- Body -->
                          <tr>
                              <td class="body" style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;">
                                Hi ${schedulesData.firstName} ${
      schedulesData.lastName
    }, <br>
                                We hope you’re having a great day so far! Here’s a quick reminder of your upcoming schedule for today:
                                <br><br>   
                                
                                Upcoming Schedules: <br>
                                <ul>
                                  ${schedulesData.scheduleList
                                    .map(
                                      (
                                        data: {
                                          title: string;
                                          timeStart: string;
                                          timeEnd: string;
                                          description: string;
                                        },
                                        index: number
                                      ) => {
                                        return `
                                        <li>
                                          Event ${index + 1}: ${data.title} <br>
                                          Time: ${formatHourTo12(
                                            data.timeStart
                                          )} - ${formatHourTo12(
                                          data.timeEnd
                                        )} <br>
                                          Description: ${data.description} <br>
                                        </li>
                                      `;
                                      }
                                    )
                                    .join("")}
                                </ul>
                              </td>
                          </tr>
                          <tr>
                              <td class="body" style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;">
                                  Don’t forget to complete your tasks and stay on top of your goals! Feel free to reach out if you need any assistance.
                                  <br><br>
                                  Best regards,
                                  TaskFlow Team             
                              </td>
                          </tr>
                          <!-- Footer -->
                          <tr>
                              <td class="footer" style="background-color: #222831; padding: 40px; text-align: center; color: white; font-size: 14px;">
                              Copyright &copy; 2024 | <span style="color: #00ADB5;">TaskFlow</span>
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
  const { searchParams } = new URL(req.url);
  const SecretEmailKey = searchParams.get("secretEmailKey")?.toString();
  const supabase = routeHandlerSupabaseIns();
  const currentDate = getCurrentDate("");

  if (!SecretEmailKey || SecretEmailKey !== process.env.NEXT_EMAIL_SECRET_KEY)
    return Response.json({
      success: false,
      Message: "There's something wrong with the secret key",
      secretKey: SecretEmailKey,
    });
  try {
    let { data, error } = await supabase
      .from("DailyNotification")
      .select("schedules")
      .eq("date", currentDate);
    if (data) {
      const schedules: scheduleType[] = data[0].schedules;
      schedules.map(async (data: scheduleType) => {
        const emailContent: { text: string; html: string } =
          generateEmailContent(data);
        await transporter.sendMail({
          ...mailOptions,
          ...emailContent,
          subject: "Schedule Remainder",
        });
      });
    }

    // return Response.json({
    //   success: true,
    //   data: data,
    // });
  } catch (err) {
    console.log(err);
    return Response.json({ message: err });
  }
}
