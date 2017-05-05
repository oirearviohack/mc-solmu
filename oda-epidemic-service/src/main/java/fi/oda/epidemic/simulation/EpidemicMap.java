package fi.oda.epidemic.simulation;

import fi.oda.epidemic.geojson.Feature;
import fi.oda.epidemic.geojson.GeoJson;

public class EpidemicMap implements Runnable{

    private GeoJson observed;
    
    private GeoJson[] simulated;
    
    private double epidemicCutoffPoint;
    private double areaRadius;
    /**
     * 
     * @param epidemicCutoffPoint
     *        Defines the number of suspected or confirmed cases needed for a full epidemic 
     * @param areaRadius
     */
    public EpidemicMap(double epidemicCutoffPoint, double areaRadius){
        this.epidemicCutoffPoint = epidemicCutoffPoint;
        this.areaRadius = areaRadius;
    }
    public void setObservedData(GeoJson observed){
        this.observed = observed;
    }
    public void setSimulatedData(GeoJson[] simulated){
        this.simulated = simulated;
    }
    
    public double getObservedLevel(double latitude, double longitude) {
        double cases = countCases(observed, latitude, longitude);
        if (cases > epidemicCutoffPoint){
            cases = epidemicCutoffPoint;
        }
        return (cases / epidemicCutoffPoint);
    }

    public double simulate(double latitude, double longitude, int timeIndex) {
        double cases = countCases(simulated[timeIndex], latitude, longitude);
        if (cases > epidemicCutoffPoint){
            cases = epidemicCutoffPoint;
        }
        return (cases / epidemicCutoffPoint);
    }

    private int countCases(GeoJson frame, double lat, double lon){
        int count = 0;
        for (Feature feature : frame.features){
            //lon lat
            double x = lon - feature.geometry.coordinates[0];
            double y = lat - feature.geometry.coordinates[1];            
            double z = Math.sqrt((x*x) + (y*y));        
            if (z <= areaRadius){
                count++;
            }
        }
        return count;
    }

    @Override
    public void run() {
        // TODO Auto-generated method stub
        
    }
    
}
