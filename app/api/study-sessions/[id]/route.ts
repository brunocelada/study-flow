import { NextResponse } from "next/server";
import { getStudySessionById } from "@/lib/db/sessions-db";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }>}
) {
    try{
        const { id } = await params;
        const sessionId = Number(id);
        //Guard against non-numeric IDs like /api/study-session/abc
        if (isNaN(sessionId)){
            return NextResponse.json(
                { error: 'Invalid session ID'},
                { status: 500}
            );
        }

        const session = await getStudySessionById(sessionId);
        
        if (!session){
            return NextResponse.json(
                { error: 'StudySession not found'},
                { status: 404 }
            )
        }
        
        return NextResponse.json(session, { status: 200});
    }catch(error){
        console.error('GET /api/study-sessions/[id] error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch session' },
            { status: 500}
        );
    }
    
}