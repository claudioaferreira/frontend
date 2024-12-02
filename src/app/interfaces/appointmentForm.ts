export interface IAppointmentForm {
  dateRange: {
    start: Date | null;
    end: Date | null;
    appointmentDescription: string | null;
  };
  employee: number | null;
}
