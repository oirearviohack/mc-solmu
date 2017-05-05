package fi.oda.epidemic.geojson;

import java.util.List;


public class GeoJson {
    public String type;
    public CRS crs;
    public Feature[] features;
    
    public GeoJson(){
        features = new Feature[0];
        crs = new CRS();
        crs.properties = new Properties();
        crs.type = "";
        
    }
    public GeoJson(String type, CRS crs, List<Feature> fromFeatureList){
        this.type = type;
        this.crs = crs;
        features = fromFeatureList.toArray(new Feature[0]);
    }
    
}
