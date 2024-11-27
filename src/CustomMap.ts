import { User } from "./User";
import { Company } from "./Company";

// Instructions to every other class on how they can be an argument to "addMarker"
export interface Mappable {
  // location is an object with lat and lng properties
  location: {
    lat: number;
    lng: number;
  };
  // markerContent is a function that returns a string
  markerContent(): string;
}

export class CustomMap {
  // We don't want to expose googleMap to change it from outside
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(
      document.getElementById(divId) as HTMLElement,
      {
        zoom: 1,
        center: {
          lat: 0,
          lng: 0,
        },
      }
    );
  }

  // the OR operator is a type guard, it checks if both types have the same property -   addMarker(mappable: User | Company): void {
  // we use interface in the good Solution
  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });

      infoWindow.open(this.googleMap, marker);
    });
  }

  /* BAD CODE 
  addCompanyMarker(company: Company): void {
    new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: company.location.lat,
        lng: company.location.lng,
      },
    });
  }
    */
}
