const root = "http://localhost:8000";

export async function getTest() {
    return await fetch(`${root}/articles`);
}

export async function getDocs() {
    return await fetch(`${root}/docs`);
}

