import { sql } from '@vercel/postgres';
import { StudySession } from '@/types/study-session';

//Fetch all study sessions for a specific student
export async function getStudySessionsByStudent(studentId: number) 
:Promise<StudySession[]> {
    try{
        const { rows } = await sql<StudySession>`
        SELECT
            id,
            "studentId",
            "taskId",
            title,
            "startTime",
            "endTime",
            status,
            notes
        FROM "StudySession"
        WHERE "studentId" = ${studentId}
        ORDER BY "startTime" ASC;
        `;
        return rows;
    }catch(error){
        console.error('Database Error (getStudySessionsByStudent:', error);
        throw new Error('Failed to fetch study sessions.');
    }    
}//end of getStudySessionsByStudent

//Fetch a single study session by ID
export async function getStudySessionById(id: number)
:Promise<StudySession | null> {
    try{
        const { rows } = await sql<StudySession>`
        SELECT
            id,
            "studentId",
            "taskId",
            title,
            "startTime",
            "endTime",
            status,
            notes
        FROM "StudySession"
        WHERE id = ${id};    
        `;
        return rows[0] || null; //return the found session or null if it doesn't exist
    }catch(error){
        console.error('Database Error (getStudySessionById):', error);
        throw new Error('Failed to fetch  study session.');
    }    
}// end of getStudySessionById

