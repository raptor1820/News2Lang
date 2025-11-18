import React from 'react';
import LessonClient from './LessonClient';

// simplified lesson schema (matching the lesson UI expectations)
type lessonSchema = {
    article_id: number,
    title: string,
    content: string,
    vocabulary: Array<{
        en: string,
        target: string,
        sentenceRef: number
    }>,
    grammar_points: Array<{
        text: string,
        sentenceRef: number
    }>,
    culture_notes: Array<{
        text: string,
        sentenceRef: number
    }>,
    difficulty: string,
    estimated_time_minutes: number,
    id: number,
    created_at: string,
    updated_at: string
}

// three dummy lessons
const lessons: lessonSchema[] = [
    {
        article_id: 1,
        title: "Technology News",
        content: `La empresa lanzó un nuevo teléfono con una cámara mejorada y una batería de mayor duración. Muchos consumidores asistieron a las tiendas para ver el dispositivo en persona. Las reseñas iniciales destacaron el diseño y la facilidad de uso.

    Los ingenieros explicaron que el nuevo software mejora la seguridad y la velocidad del sistema operativo. También anunciaron actualizaciones periódicas que llegarán durante el próximo año. Los analistas comentaron que la empresa busca ampliar su cuota de mercado con precios competitivos.

    Mientras tanto, los proveedores están ajustando la producción para satisfacer la demanda y algunos minoristas ofrecen promociones especiales durante las primeras semanas.`,
        vocabulary: [
            { en: "company", target: "empresa", sentenceRef: 0 },
            { en: "phone", target: "teléfono", sentenceRef: 0 },
            { en: "camera", target: "cámara", sentenceRef: 0 },
            { en: "battery", target: "batería", sentenceRef: 0 },
            { en: "consumer", target: "consumidor", sentenceRef: 1 },
            { en: "review", target: "reseña", sentenceRef: 2 },
            { en: "engineer", target: "ingeniero", sentenceRef: 3 },
            { en: "software", target: "software", sentenceRef: 3 },
            { en: "update", target: "actualización", sentenceRef: 4 },
            { en: "retailer", target: "minorista", sentenceRef: 6 },
        ],
        grammar_points: [
            { text: "Use of past tense for completed events (pretérito).", sentenceRef: 0 },
            { text: "Future actions can be described with 'ir a' + infinitive or simple future.", sentenceRef: 4 },
            { text: "Adjective-noun agreement: adjectives match gender and number.", sentenceRef: 2 },
        ],
        culture_notes: [
            { text: "Product launch events often include hands-on demos and media briefings.", sentenceRef: 1 },
            { text: "In many regions, early-bird promotions encourage local shoppers to visit physical stores.", sentenceRef: 6 },
        ],
        difficulty: "beginner",
        estimated_time_minutes: 5,
        id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        article_id: 2,
        title: "Business News",
        content: `La compañía presentó sus resultados financieros trimestrales y superó las expectativas en ventas. El director ejecutivo señaló que la diversificación de productos ha sido clave. Algunos departamentos recibirán un aumento en la inversión para continuar la expansión.

    Los inversores mostraron una reacción mixta, con algunos vendiendo acciones y otros apostando por el crecimiento a largo plazo. Los analistas destacaron que la empresa ha reducido costos operativos sin comprometer la calidad.

    Además, la compañía anunció planes para explorar nuevos mercados en la región, lo que podría implicar alianzas estratégicas con socios locales.`,
        vocabulary: [
            { en: "quarter", target: "trimestre", sentenceRef: 0 },
            { en: "sales", target: "ventas", sentenceRef: 0 },
            { en: "CEO", target: "director ejecutivo", sentenceRef: 1 },
            { en: "investment", target: "inversión", sentenceRef: 2 },
            { en: "investor", target: "inversor", sentenceRef: 3 },
            { en: "analyst", target: "analista", sentenceRef: 4 },
            { en: "costs", target: "costos", sentenceRef: 4 },
            { en: "quality", target: "calidad", sentenceRef: 4 },
            { en: "market", target: "mercado", sentenceRef: 6 },
            { en: "partnership", target: "alianza", sentenceRef: 6 },
        ],
        grammar_points: [
            { text: "Passive constructions are common in formal reports.", sentenceRef: 0 },
            { text: "Use of reported speech when quoting executives.", sentenceRef: 1 },
            { text: "Expressions for financial performance: 'superar expectativas', 'reducir costos'.", sentenceRef: 0 },
        ],
        culture_notes: [
            { text: "Business relationships often develop through repeated meetings and referrals.", sentenceRef: 6 },
            { text: "Corporate social responsibility programs can influence public perception.", sentenceRef: 0 },
        ],
        difficulty: "intermediate",
        estimated_time_minutes: 8,
        id: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        article_id: 3,
        title: "Science News",
        content: `Investigadores descubrieron una nueva técnica para analizar muestras más rápidamente. El equipo publicó sus hallazgos en una revista revisada por pares. Los experimentos iniciales muestran resultados prometedores que podrían acelerar diagnósticos.

    El estudio incluye colaboraciones entre universidades y laboratorios privados, lo que permitió combinar recursos y experiencia. Los investigadores enfatizaron la necesidad de ensayos adicionales antes de una aplicación clínica.

    La comunidad científica recibió el trabajo con interés y varios grupos planean replicar los experimentos para validar los resultados.`,
        vocabulary: [
            { en: "researcher", target: "investigador", sentenceRef: 0 },
            { en: "technique", target: "técnica", sentenceRef: 0 },
            { en: "sample", target: "muestra", sentenceRef: 0 },
            { en: "journal", target: "revista", sentenceRef: 1 },
            { en: "experiment", target: "experimento", sentenceRef: 2 },
            { en: "diagnosis", target: "diagnóstico", sentenceRef: 2 },
            { en: "collaboration", target: "colaboración", sentenceRef: 3 },
            { en: "university", target: "universidad", sentenceRef: 3 },
            { en: "trial", target: "ensayo", sentenceRef: 4 },
            { en: "replicate", target: "replicar", sentenceRef: 5 },
        ],
        grammar_points: [
            { text: "Use of passive voice to focus on the procedure rather than the actor.", sentenceRef: 1 },
            { text: "Modal verbs to express possibility and necessity in scientific claims.", sentenceRef: 2 },
            { text: "Complex sentence structures to link evidence and conclusions.", sentenceRef: 4 },
        ],
        culture_notes: [
            { text: "Scientific collaboration often crosses institutions and countries to pool expertise.", sentenceRef: 3 },
            { text: "Public science communication helps translate technical findings for wider audiences.", sentenceRef: 5 },
        ],
        difficulty: "advanced",
        estimated_time_minutes: 10,
        id: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
];

type Props = { params: Promise<{ id: string }> };

export default async function LessonPage({ params }: Props) {
    // In the App Router params may be a Promise; await it before use.
    const resolved = await params;
    const id = parseInt(resolved.id || '1', 10);
    const lesson = lessons.find(l => l.id === id) || lessons[0];

    // Render a client-side component for interactivity. Keeping this page
    // as a server component ensures `params.id` is provided correctly.
    return <LessonClient lesson={lesson} />;
}
