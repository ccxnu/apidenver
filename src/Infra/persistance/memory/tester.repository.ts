import { IGenericRepository } from "@Application/Common/Repositories/generic.repository";
import { ITester } from "@Domain/Entities/tester";

export class TesterRepository implements IGenericRepository<ITester>
{
    private testers: ITester[] = [];

    async findById(id: string): Promise<ITester | null>
    {
        return this.testers.find((tester) => tester.id === id) || null;
    }

    async findAll(): Promise<ITester[]>
    {
        return this.testers;
    }

    async create(entity: ITester): Promise<ITester>
    {
        this.testers.push(entity);
        return entity;
    }

    async update(id: string, entity: ITester): Promise<ITester>
    {
        const index = this.testers.findIndex((tester) => tester.id === id);
        if (index !== -1)
        {
            this.testers[index] = { ...this.testers[index], ...entity };
            return this.testers[index];
        }
        throw new Error("Tester not found");
    }

    async delete(id: string): Promise<void>
    {
        const index = this.testers.findIndex((tester) => tester.id === id);
        if (index !== -1)
        {
            this.testers.splice(index, 1);
        }
    }
}
