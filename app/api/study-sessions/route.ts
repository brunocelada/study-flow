import { NextResponse, connection } from "next/server";
import { getStudySessionsByStudent } from "@/lib/db/sessions-db";

export async function GET() {
    await connection();
    try{
        //replace this hardcores student id with real auth session later
        const student_id = "usr_01a9b8c7";
        const sessions = await getStudySessionsByStudent(student_id);
        return NextResponse.json(sessions, { status: 200});
    }catch(error){
        console.error('GET /api/study-sessions error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch study sessions' },
            { status: 500}
        );
    }
}