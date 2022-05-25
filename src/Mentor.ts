import { Conference } from "./Conference";
import { Person } from "./shared/person";
import { Response } from "./Response";
import Store from "./Store";
export class Mentor extends Person {
  public conferences: Conference[];
  constructor(name: string, email: string, password: string) {
    super(name, email, password);
    this.conferences = [];
  }
  public static verifyMentorAvailability(
    mentor: Mentor,
    startingDateEvent: Date
  ): boolean {
    if (mentor.conferences.length)
      return mentor.conferences.every((conference) => {
        conference.endingDate.getTime() <= startingDateEvent.getTime();
      });
    return true;
  }
  public static authMentor(email: string, password: string): Response {
    const response = new Response();
    const mentorExists: boolean = Store.mentorExists(email);
    if (!mentorExists) {
      response.error = true;
      response.message =
        "Según las credenciales ingresadas el mentor no está registrado en el sistema";
      return response;
    }
    const mentor = Store.getMentorThatAlreadyExists(email);
    if (!(mentor.password === password)) {
      response.error = true;
      response.message = "Contraseña incorrecta";
      return response;
    }
    response.error = false;
    response.message = "Mentor autenticado con éxito";
    return response;
  }
}
