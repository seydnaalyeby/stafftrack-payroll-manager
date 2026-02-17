export interface Attendance {
  id: number;
  date: string;
  workerId: number;
  workerName: string;
  status: 'PRESENT' | 'ABSENT';
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceRequest {
  date: string;
  workerId: number;
  status: 'PRESENT' | 'ABSENT';
}

export interface AttendanceResponse extends Attendance {}
