package fi.oda;

import java.util.List;


public class GeoJson {
    public String type;
    public CRS crs;
    public Feature[] features;
    
    
    public GeoJson(String type, CRS crs, List<Feature> fromFeatureList){
        this.type = type;
        this.crs = crs;
        features = fromFeatureList.toArray(new Feature[0]);
    }
    
}
