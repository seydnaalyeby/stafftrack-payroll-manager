export interface Worker {
  id: number;
  name: string;
  phone: string;
  position: string;
  monthlySalary: number;
  dailySalary: number;
  joinDate: string;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkerRequest {
  name: string;
  phone: string;
  position: string;
  monthlySalary: number;
  joinDate: string;
  photoUrl?: string;
}

export interface WorkerResponse extends Worker {}
