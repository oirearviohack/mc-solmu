package fi.oda.epidemic.service;

import org.springframework.stereotype.Service;

import fi.oda.epidemic.simulation.EpidemicMap;

@Service
public class EpidemicService {
    private EpidemicMap epidemicMap;

    public EpidemicService(EpidemicMap epidemicMap){
        this.epidemicMap = epidemicMap;
    }
    
    public double calcEpidemicLevel(double latitude, double longitude, int timeIndex) {
        if (timeIndex == 0){
            return epidemicMap.getObservedLevel(latitude, longitude);
        }
        return epidemicMap.simulate(latitude, longitude, timeIndex);
    }

}
