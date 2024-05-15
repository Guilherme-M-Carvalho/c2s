import * as SQLite from 'expo-sqlite';
import { StudentProps } from '../types/student';

export function useSqlLite() {

    const handleReturnDatabase = async () => {
        return await SQLite.openDatabaseAsync('InnovateTech');
    }

    const handleCreateTableStudents = async () => {
        const db = await handleReturnDatabase()
        await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS students (id TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, first TEXT NOT NULL, last TEXT NOT NULL, email TEXT NOT NULL, gender TEXT NOT NULL, nasc TEXT NOT NULL, phone TEXT NOT NULL, nationality TEXT NOT NULL, street_name TEXT NOT NULL, street_number INTEGER NOT NULL, city TEXT NOT NULL, state TEXT NOT NULL, postcode INTEGER NOT NULL, country TEXT NOT NULL);
        `);
    }

    const handleInsertStudents = async (students: StudentProps[]) => {
        const db = await handleReturnDatabase()
        const arrInsert = students.map(el => {
            return `INSERT INTO students (id, title, first, last, email, gender, nasc, phone, nationality, street_name, street_number, city, state, postcode, country) VALUES ('${el.id.value}', '${el.name.title}', '${el.name.first}', '${el.name.last}', '${el.email}', '${el.gender}', '${new Intl.DateTimeFormat('pt-BR', {
                dateStyle: 'short',
            }).format(new Date(el.dob.date))}', '${el.phone}', '${el.nat}', '${el.location.street.name}', ${el.location.street.number}, '${el.location.city}', '${el.location.state}', ${el.location.postcode}, ${el.location.country});`
        })
        const exec = arrInsert.join("")
        await db.execAsync(exec)
    }

    const handleFindStudents = async() => {
        const db = await handleReturnDatabase()
        const allRows = await db.getAllAsync('SELECT * FROM students');
        return allRows
    }

    return {
        handleFindStudents,
        handleCreateTableStudents,
        handleInsertStudents
    }
}