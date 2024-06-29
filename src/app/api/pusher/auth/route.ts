import { auth } from "@clerk/nextjs";
import { getPusherInstance } from "../../../../lib/pusher/server/index";


const pusherServer = getPusherInstance();

export async function POST(req: Request) {
  const data = await req.text();
  const [socketId, channelName] = data.split("&").map((str) => str.split("=")[1]);

  // Get user session information from Clerk
  const userSession =  auth();

  // Check if the user has the necessary permissions (example: check user role)


  if (userSession) {
    // User has permission, authorize channel access
    const authResponse = pusherServer.authorizeChannel(socketId, channelName);
    return new Response(JSON.stringify(authResponse));
  } else {
    // User does not have permission, deny channel access
    return new Response("Unauthorized", { status: 401 });
  }
}
