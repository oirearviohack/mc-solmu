package fi.oda.epidemic.util;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import fi.oda.epidemic.geojson.CRS;
import fi.oda.epidemic.geojson.Feature;
import fi.oda.epidemic.geojson.GeoJson;

public class Convert {
    static ObjectMapper om = new ObjectMapper();
   // static final String MARKER_LINE = "\"\"\"Infected\"\"\",,,,\"\"\"Not Infected\"\"\"";
    static final String MARKER_LINE_START = "\"TURTLES\"";
    static final String MARKER_LINE_END = "\"PATCHES\"";
    public static void main(String[] args) throws JsonGenerationException, JsonMappingException, IOException {
        double latMinArg = Double.parseDouble(args[0]);
        double lonMinArg = Double.parseDouble(args[1]);
        double latMaxArg = Double.parseDouble(args[2]);
        double lonMaxArg = Double.parseDouble(args[3]);
        
        double latMinData =  Double.parseDouble(args[4]);
        double lonMinData =Double.parseDouble(args[5]);
        double latMaxData = Double.parseDouble(args[6]);
        double lonMaxData = Double.parseDouble(args[7]);
        
     
        Map<String, List<String>> frames = new HashMap<String, List<String>>();
        
        try(Stream<Path> paths = Files.walk(Paths.get("."))) {
            paths.forEach(filePath -> {

                if (filePath.toString().endsWith("csv")){
                    String stringPath = filePath.getFileName().toString();
                    String iteration = stringPath.split("_")[1].split("\\.")[0];
                    try {
                        frames.put(iteration, Files.readAllLines((filePath),Charset.forName("UTF-8")));
                    }
                    catch (Exception e) {
                        e.printStackTrace();
                    } 
                }
            });
        } 
        Map<String, GeoJson> geoJsons = parseGeoJsons(frames);
        
/*
        for (GeoJson g : geoJsons.values()){
            for (Feature f : g.features){
                if (latMinData > f.geometry.coordinates[0]){
                    latMinData = f.geometry.coordinates[0];
                }
                if (latMaxData < f.geometry.coordinates[0]){
                    latMaxData = f.geometry.coordinates[0];
                }
                if (lonMaxData < f.geometry.coordinates[1]){
                    lonMaxData = f.geometry.coordinates[1];
                }
                if (lonMinData > f.geometry.coordinates[1]){
                    lonMinData = f.geometry.coordinates[1];
                }                
            }
        }*/
        for (GeoJson g : geoJsons.values()){
            scale(g, latMinData, lonMinData, latMaxData, lonMaxData, latMinArg, lonMinArg, latMaxArg, lonMaxArg);
        }
        
        geoJsons.entrySet().forEach(e -> {
            try {
                write(Paths.get(Paths.get("").toString(), "frame_" + e.getKey() + ".json"), e.getValue());
            }
            catch (Exception e1) {
                e1.printStackTrace();
            }
        });
    }
    private static void scale(GeoJson g, double latMinData, double lonMinData, double latMaxData, double lonMaxData, double latMinArg,
            double lonMinArg, double latMaxArg, double lonMaxArg) {
        double dataHeight = latMaxData - latMinData;
        double dataWidth = lonMaxData - lonMinData;
        double argHeight = latMaxArg - latMinArg;
        double argWidth = lonMaxArg - lonMinArg;
        double latScale = argHeight / dataHeight;
        double lonScale = argWidth / dataWidth;
        for (Feature f : g.features){
            double new_1 = ((f.geometry.coordinates[0] - latMinData) * latScale) + latMinArg;
            double new_0 = ((f.geometry.coordinates[1] - lonMinData) * lonScale) + lonMinArg;
            
            f.geometry.coordinates[0] = new_0;
            f.geometry.coordinates[1] = new_1;
        }
        
    }
    private static Map<String, GeoJson> parseGeoJsons(Map<String, List<String>> frames) {
        Map<String, GeoJson> result = new HashMap<String, GeoJson>();
        frames.entrySet().forEach(e -> {
            CRS crs = new CRS();
            crs.type = "name";
            crs.properties.name = "EPSG:4326";
            List<Feature> featureList = new ArrayList<Feature>();
            Iterator<String> lineIterator = e.getValue().iterator();
            boolean reading = false;
            while (lineIterator.hasNext()){
                String line = lineIterator.next().trim();
                if (line.length() == 0){
                    continue;
                }
                if (line.startsWith(MARKER_LINE_START)){
                    lineIterator.next();
                    reading = true;
                }
                else if (line.startsWith(MARKER_LINE_END)){
                    break;
                }
                else if (reading == true){
                    String[] split = line.split(",");
                    if (!split[1].equals("\"15\"")){
                        continue;
                    }
                    String x = split[3].trim();
                    String y = split[4].trim();
                    x = x.substring(1, x.length() - 1);
                    y = y.substring(1,  y.length() - 1);
                    Feature f = new Feature();
                    f.type = "Feature";
                    f.geometry.type="Point";
                    f.geometry.coordinates = new double[]{Double.parseDouble(y), Double.parseDouble(x)};
                    featureList.add(f);

                    /*String x = split[0].trim();
                    String y = split[1].trim();
                    x = x.substring(1, x.length() - 1);
                    y = y.substring(1,  y.length() - 1);
                    Feature f = new Feature();
                    f.type = "Feature";
                    f.geometry.type="Point";
                    f.geometry.coordinates = new double[]{Double.parseDouble(y), Double.parseDouble(x)};
                    featureList.add(f);*/
                }
            }
            
            GeoJson json = new GeoJson("FeatureCollection", crs, featureList);
            result.put(e.getKey(), json);            
        });
        return result;
    }
    private static void write(Path file, GeoJson json) throws JsonGenerationException, JsonMappingException, IOException{
        
        om.writeValue(file.toFile(), json);  
    }
}
