package fi.oda.dss.config;


import java.io.IOException;
import java.io.InputStream;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import fi.oda.epidemic.geojson.GeoJson;
import fi.oda.epidemic.simulation.EpidemicMap;

@Configuration
public class Config  {

    @Bean
    public EpidemicMap epidemicMap() {
        EpidemicMap epidemicMap = new EpidemicMap(125, 0.55);
        ObjectMapper om = new ObjectMapper();
        try(InputStream is = ClassLoader.class.getResourceAsStream("/data/frame_0.json")){
            epidemicMap.setObservedData(om.readValue(is, GeoJson.class));
            
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        GeoJson[] predictedData = new GeoJson[87];
        for (int index = 1; index < 87; index++){
            
            try(InputStream is = ClassLoader.class.getResourceAsStream("/data/frame_" + index + ".json")){
                predictedData[index -1] = om.readValue(is, GeoJson.class);
            }
            catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }                        
        }
        epidemicMap.setSimulatedData(predictedData);

        return epidemicMap;
    }
}
