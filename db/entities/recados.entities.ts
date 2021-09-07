import "reflect-metadata";
import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({ name: "recado" })
export class Recado extends BaseEntity {
    @PrimaryColumn()
    uid?: string;

    @Column()
    recado: string;

    @Column()
    detalhes: string;

    @Column({ name: "created_at" })
    createdAt?: Date;

    @Column({ name: "updated_at" })
    updatedAt?: Date;

    @BeforeInsert()
    private beforeInsert() {
        this.uid = uuid();
        this.createdAt = new Date(Date.now());
        this.updatedAt = new Date(Date.now());
    }

    @BeforeUpdate()
    private beforeUpdate() {
        this.updatedAt = new Date(Date.now());
    }

    constructor(
        recado: string,
        detalhes: string,
        uid?: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        super();
        this.recado = recado;
        this.detalhes = detalhes;
        this.uid = uid;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
