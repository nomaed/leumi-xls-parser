declare module "leumi-xls-parser" {
    export function isCompatible(input: string | Buffer): boolean;
    export function parse(input: string | Buffer): Promise<Array<LeumiRecord>>;
    export function parse(input: string | Buffer, callback: (err: Error, data?: string | Buffer) => void): void;
    export function parseSync(input: string | Buffer): Array<LeumiRecord>;

    export interface LeumiRecord {
        date: Date;
        description: string;
        reference: string;
        expense: number;
        income: number;
        balance: number;
    }
}
