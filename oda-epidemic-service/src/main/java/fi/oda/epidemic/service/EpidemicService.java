package fi.oda.epidemic.service;

import org.springframework.stereotype.Service;

import fi.oda.epidemic.simulation.EpidemicMap;
/**
 *
 */
@Service
public class EpidemicService {
    private EpidemicMap epidemicMap;

    public EpidemicService(EpidemicMap epidemicMap){
        this.epidemicMap = epidemicMap;
    }
    public Double[] calcEpidemicLevelAll(double latitude, double longitude, int t) {
        return epidemicMap.simulateAll(latitude, longitude, t);
    }
    public double calcEpidemicLevel(double latitude, double longitude, int timeIndex) {
        if (timeIndex == 0){
            return epidemicMap.getObservedLevel(latitude, longitude);
        }
        return epidemicMap.simulate(latitude, longitude, timeIndex);
    }

}
