import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance, AttendanceRequest } from '../models/attendance.models';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private readonly API_URL = 'http://localhost:30000/api/attendance';

  constructor(private http: HttpClient) {}

  markAttendance(request: AttendanceRequest): Observable<Attendance> {
    return this.http.post<Attendance>(this.API_URL, request);
  }

  getAttendanceById(id: number): Observable<Attendance> {
    return this.http.get<Attendance>(`${this.API_URL}/${id}`);
  }

  getAttendanceByDate(date: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.API_URL}/date/${date}`);
  }

  getAttendanceByWorkerAndDateRange(workerId: number, startDate: string, endDate: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.API_URL}/worker/${workerId}?startDate=${startDate}&endDate=${endDate}`);
  }

  getAttendanceByDateRange(startDate: string, endDate: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.API_URL}/range?startDate=${startDate}&endDate=${endDate}`);
  }

  getPresentDaysCount(workerId: number, startDate: string, endDate: string): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/worker/${workerId}/present-days?startDate=${startDate}&endDate=${endDate}`);
  }
}
