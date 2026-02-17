import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Worker, WorkerRequest } from '../models/worker.models';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private readonly API_URL = 'http://localhost:30000/api/workers';

  constructor(private http: HttpClient) {}

  getAllWorkers(): Observable<Worker[]> {
    return this.http.get<Worker[]>(this.API_URL);
  }

  getWorkerById(id: number): Observable<Worker> {
    return this.http.get<Worker>(`${this.API_URL}/${id}`);
  }

  createWorker(request: WorkerRequest): Observable<Worker> {
    return this.http.post<Worker>(this.API_URL, request);
  }

  updateWorker(id: number, request: WorkerRequest): Observable<Worker> {
    return this.http.put<Worker>(`${this.API_URL}/${id}`, request);
  }

  deleteWorker(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  searchWorkers(name: string): Observable<Worker[]> {
    return this.http.get<Worker[]>(`${this.API_URL}/search?name=${name}`);
  }

  getWorkersByPosition(position: string): Observable<Worker[]> {
    return this.http.get<Worker[]>(`${this.API_URL}/by-position?position=${position}`);
  }
}
