package fi.oda.epidemic.geojson;

public class Feature {
    public String type;
    public Geometry geometry;
    public Properties properties;
    
    public Feature(){
        geometry = new Geometry();
        properties = new Properties();
        properties.name = "joo";
    }
}
