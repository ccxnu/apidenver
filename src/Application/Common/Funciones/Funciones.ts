import { randomUUID } from "node:crypto";
import { randomFillSync } from "node:crypto";

export class Funciones
{
    private length: number = 6;
    private characters: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$*_";

    getRandomNumber(length?: number): number
    {
        const size = (length ?? this.length) - 1;
        const n = Math.pow(10, size);

        return Math.floor(n + Math.random() * n * 9);
    }

    getRandomPassword(length?: number): string
    {
        const lg = length ?? this.length;

        return Array.from(randomFillSync(new Uint32Array(lg)))
            .map((x) => this.characters[x % this.characters.length])
            .join("");
    }

    getNewUUID(): string
    {
        return randomUUID();
    }
}
