import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("products").del();

    await knex("products").insert([
        { name: "Nhoque", price: 45 },
        { name: "Frango", price: 60 },
        { name: "Tilápia", price: 100 },
        { name: "Bolo", price: 75 },
        { name: "Escondidinho", price: 65 },
        { name: "Batata fritas", price: 40 },
        { name: "Frango Grilado", price: 36 },
        { name: "Tilápia Grilado", price: 39 },
        { name: "Palmito", price: 30 },
        { name: "Refrigerante", price: 7.5 },
        { name: "Suco", price: 10 },
    ]);
}
