import { sql } from '@vercel/postgres';
import { StudySession } from '@/types/study-session';

//Fetch all study sessions for a specific student
export async function getStudySessionsByStudent(student_id: string) 
:Promise<StudySession[]> {
    try{
        const { rows } = await sql<StudySession>`
        SELECT
            id,
            student_id,
            task_id,
            title,
            start_time,
            end_time,
            status,
            notes
        FROM study_sessions
        WHERE student_id = ${student_id}
        ORDER BY start_time ASC;
        `;
        return rows;
    }catch(error){
        console.error('Database Error (getStudySessionsByStudent:', error);
        throw new Error('Failed to fetch study sessions.');
    }    
}//end of getStudySessionsByStudent

//Fetch a single study session by ID
export async function getStudySessionById(id: number, student_id: string)
:Promise<StudySession | null> {
    try{
        const { rows } = await sql<StudySession>`
        SELECT
            id,
            student_id,
            task_id,
            title,
            start_time,
            end_time,
            status,
            notes
        FROM study_sessions
        WHERE id = ${id}
        AND student_id = ${student_id}
        LIMIT 1;    
        `;
        return rows[0] || null; //return the found session or null if it doesn't exist
    }catch(error){
        console.error('Database Error (getStudySessionById):', error);
        throw new Error('Failed to fetch  study session.');
    }    
}// end of getStudySessionById

