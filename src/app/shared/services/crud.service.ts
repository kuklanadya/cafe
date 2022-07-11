import {
    CollectionReference,
    Firestore,
    Query,
    addDoc,
    collection,
    deleteDoc,
    doc,
    query,
    updateDoc,
    where,
    docData,
} from '@angular/fire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { DocumentReference } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { collectionData } from 'rxfire/firestore';
import { DbEntity } from '../db-entity.model';


@Injectable({
    providedIn: 'root'
})

export abstract class CrudService<T extends DbEntity> {

    abstract collectionName: string;

    constructor(protected firestore: Firestore) { }

    private get collectionRef(): CollectionReference {
        return collection(this.firestore, this.collectionName);
    }

    create(doc: T): Promise<DocumentReference<DocumentData>> {
        return addDoc(this.collectionRef, { ...doc });
    }

    read(): Observable<any[] | null> {
        const clientRef = query(this.collectionRef);
        return collectionData(clientRef, { idField: 'id' })
            .pipe(map((lists: any[]) => lists.length ? lists : null));
    }

    update(id: string, entity: T): Promise<void> {
        const docRef = doc(this.firestore, this.collectionName, id);
        const newObject: any = { ...entity };
        return updateDoc(docRef, newObject);
    }

    delete(id: string): Promise<void> {
        const docRef = doc(this.firestore, this.collectionName, id);
        return deleteDoc(docRef);
    }

    getAll(order = { field: 'createdAt', value: 'desc' as any }, search: any = null): Observable<DocumentData[]> {
        console.log(this.collectionName, 'getAll', order, search);
        const allQuery: Query<DocumentData> = !search ?
            query(this.collectionRef) :
            query(this.collectionRef, where(search.field, '==', search.value));

        return collectionData(allQuery, { idField: 'id' }).pipe(
            map((data: any) => { //(data: T[])
                const newData = data.map((item: T) => {
                    return {
                        ...item,
                        createdAt: (item.createdAt as any)?.toDate() || new Date()
                    }
                });
                const coef = order.value === 'desc' ? 1 : -1;
                newData.sort((a: any, b: any) => {
                    return a.createdAt.getTime() > b.createdAt.getTime() ? coef * 1 : coef * -1;
                })
                return newData;
            })
        );
    }

    getById(id: string): Observable<T> {
        const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
        return docData(docRef, { idField: 'id' }).pipe(
            mergeMap((list: any) => { //(list: T)
                return of(list);
            })
        );
    }

    getByField(field: string, value: any, isUnique: boolean = false): Observable<T | T[]> {
        const docsRef = query(this.collectionRef, where(field, '==', value));
        return collectionData(docsRef, { idField: 'id' }).pipe(
            map((lists: any) => { //(list: T[])
                if (isUnique) {
                    return lists.length ? lists[0] : [];
                }
                return lists || undefined;
            })
        );
    }
}