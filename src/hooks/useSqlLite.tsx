import * as SQLite from 'expo-sqlite';
import { StudentProps } from '../types/student';
import * as FileSystem from 'expo-file-system';

export type StudentsSQL = StudentSQL[]

export interface StudentSQL {
    city: string
    country: string
    email: string
    first: string
    gender: string
    id: string
    image_large: string
    image_medium: string
    last: string
    nasc: string
    nationality: string
    phone: string
    postcode: string
    state: string
    street_name: string
    street_number: number
    title: string
}


export function useSqlLite() {
    const db = SQLite.useSQLiteContext();

    const handleCreateTableStudents = async () => {

        // await db.runAsync(`delete from student where id not null`)
        // await db.runAsync(`DROP TABLE student;`)
        // try{

        //     await db.runAsync(`DROP TABLE students;`)
        // } catch(err){
        //     console.log(err);

        // }
    }

    const handleInsertStudents = async (students: StudentProps[]) => {


        const arrInsert = await Promise.all(students.map(async (el) => {

            let urilMedium: string = ""
            let urilLarge: string = ""

            try {
                const { uri } = await FileSystem.downloadAsync(
                    String(el.picture?.medium),
                    FileSystem.documentDirectory + String(el.id.value) + el.name.first + ".png",

                );
                const { uri: uriLarge } = await FileSystem.downloadAsync(
                    String(el.picture?.large),
                    FileSystem.documentDirectory + String(el.id.value) + el.name.first + ".png",
                );

                urilMedium = String(uri)
                urilLarge = String(uriLarge)
                console.log('Finished downloading to ', uri, uriLarge);
            } catch (e) {
                console.error(e);
            }
            return `INSERT INTO student (id, title, first, last, email, gender, nasc, phone, nationality, street_name, street_number, city, state, postcode, country, image_medium, image_large) VALUES ('${el.id.value}', '${el.name.title}', '${el.name.first}', '${el.name.last}', '${el.email}', '${el.gender}', '${el.dob.date}', '${el.phone}', '${el.nat}', '${el.location.street.name}', ${el.location.street.number}, '${el.location.city}', '${el.location.state}', '${el.location.postcode}', '${el.location.country}', '${urilMedium}', '${urilLarge}');`
        }))

        // const exec = arrInsert.join("")
        // console.log(exec);
        try {

            await Promise.all(arrInsert.map(async (el) => {
                await db.runAsync(el)
            }))
        } catch (error) {
            console.log(error);

        }
    }

    const handleFindStudents = async () => {
        const allRows = await db.getAllAsync<StudentSQL>('SELECT * FROM student');
        // console.log({allRows});

        return allRows
    }

    return {
        handleFindStudents,
        handleCreateTableStudents,
        handleInsertStudents
    }
}