import { SQLiteDatabase } from "expo-sqlite";

async function useCreateDatabase(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
        'PRAGMA user_version'
    ) as any;
    
    if (currentDbVersion >= DATABASE_VERSION) {
        return;
    }
    if (true) {
        await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS students (id TEXT NOT NULL, title TEXT NOT NULL, first TEXT NOT NULL, last TEXT NOT NULL, email TEXT NOT NULL, gender TEXT NOT NULL, nasc TEXT NOT NULL, phone TEXT NOT NULL, nationality TEXT NOT NULL, street_name TEXT NOT NULL, street_number INTEGER NOT NULL, city TEXT NOT NULL, state TEXT NOT NULL, postcode TEXT NOT NULL, country TEXT NOT NULL, image_medium TEXT NOT NULL, image_large TEXT NOT NULL);
        `);
        
        currentDbVersion = 1;
    }
    // if (currentDbVersion === 1) {
    //   Add more migrations
    // }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export {useCreateDatabase}