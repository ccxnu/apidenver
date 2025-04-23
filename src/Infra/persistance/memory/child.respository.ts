import { IGenericRepository } from "@Application/Common/Repositories/generic.repository";
import { IChild } from "@Domain/Entities/child";

export class ChildRepository implements IGenericRepository<IChild>
{
    private children: IChild[] = [];

    async findById(id: string): Promise<IChild | null>
    {
        return this.children.find(child => child.id === id) || null;
    }

    async findAll(): Promise<IChild[]>
    {
        return this.children;
    }

    async create(entity: IChild): Promise<IChild>
    {
        this.children.push(entity);
        return entity;
    }

    async update(id: string, entity: IChild): Promise<IChild>
    {
        const index = this.children.findIndex(child => child.id === id);
        if (index !== -1) {
            this.children[index] = { ...this.children[index], ...entity };
            return this.children[index];
        }
        throw new Error('Child not found');
    }

    async delete(id: string): Promise<void>
    {
        const index = this.children.findIndex(child => child.id === id);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }
}
