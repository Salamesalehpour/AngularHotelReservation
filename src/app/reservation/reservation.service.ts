import { Injectable } from '@angular/core';
import {Reservation} from "../models/reservation";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservations: Reservation[] = [];
  private baseUrl = 'http://localhost:3000/'
  constructor(private httpClient: HttpClient) {
  }
  getReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(this.baseUrl + 'reservations');
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(res => res.id === id);
  }

  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index, 1);
  }

  updateReservation(id: string, reservation: Reservation): void {
    let index = this.reservations.findIndex(res => res.id === id);
    reservation.id = id;
    this.reservations[index] = reservation;
  }
}
