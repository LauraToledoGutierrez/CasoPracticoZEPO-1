
import axios from 'axios';

export class Formula1Info {

    // Get pilot data from the API
    async fetchDriversData() {
        const driversResponse = await axios.get('https://api.openf1.org/v1/drivers');
        return driversResponse.data;
    }

    // Get pit stop data from the API
    async fetchPitStopsData() {
        const pitStopsResponse = await axios.get('https://api.openf1.org/v1/pit');
        return pitStopsResponse.data;
    }

    // Filter drivers with pit stops of less than 50 seconds
    filterDriversPitLessThan50(pilotData: any[], pitStopsData: any[]) {
        // Make a object to map the driver_number to the pit stop duration
        const pitStopMap: { [key: number]: number } = {};
        pitStopsData.forEach((pitStop: any) => {
            const pilotNumber = pitStop.driver_number;
            const pitDuration = pitStop.pit_duration;
            if (pilotNumber && pitDuration) {
                pitStopMap[pilotNumber] = pitDuration;
            }
        });

        // Filter out drivers whose pit stop duration is less than 50 seconds
        const pilotPitLessThan50 = pilotData.filter((pilot: any) => {
            const pilotNumber = pilot.driver_number;
            const pitDuration = pitStopMap[pilotNumber];
            return pitDuration && pitDuration < 50;
        });

        // Get the names of the filtered pilots
        const driverNamesPitLessThan50 = pilotPitLessThan50.map((pilot: any) => ({
            full_name: pilot.full_name,
            pit_duration: pitStopMap[pilot.driver_number] || 0,
        }));
        
        return driverNamesPitLessThan50; 
    }

    // Filter pilots by nationality
    filterDriversByNationality(pilotData: any[], nationality: string) {
        // Create a set to store unique pilot names
        const pilotByNationalitySet = new Set();
        pilotData.forEach((pilot: any) => {
            if (pilot.country_code === nationality) {
            pilotByNationalitySet.add(pilot.full_name);
            }
        });

        return Array.from(pilotByNationalitySet);  
    }

    // Filter pilots by nationality and 
    filterDriversByNationalityAndNamePattern(pilotData: any[], nationality: string, namePattern: string) {
        // Get pilots by nationality
        const driversByNationality = this.filterDriversByNationality(pilotData, nationality);  
        // Convert the search pattern to lowercase to make it case insensitive
        const patternLowerCase = namePattern.toLowerCase();
    
        // Filter pilots who have the pattern in their the first or last name
        return driversByNationality.filter((pilot: any) => {
            return (
                pilot.full_name &&
                pilot.last_name &&
                (pilot.full_name.toLowerCase().includes(patternLowerCase) || pilot.last_name.toLowerCase().includes(patternLowerCase))
            );
        });
    }
}