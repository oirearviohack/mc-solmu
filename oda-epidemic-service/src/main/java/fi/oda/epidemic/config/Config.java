package fi.oda.epidemic.config;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import com.fasterxml.jackson.databind.ObjectMapper;


import fi.oda.epidemic.geojson.GeoJson;
import fi.oda.epidemic.simulation.EpidemicMap;


@Configuration
public class Config  {

    public static final String DATA_PATH = "src/main/resources/data";
    @Bean
    public EpidemicMap epidemicMap() {

        EpidemicMap epidemicMap = new EpidemicMap(12, 0.22);
        ObjectMapper om = new ObjectMapper();
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(new ClassPathResource(Paths.get("data/frame_0.json").toString()).getInputStream(), Charset.forName("UTF-8")))) {
            epidemicMap.setObservedData(om.readValue(reader, GeoJson.class));
            
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        GeoJson[] predictedData = new GeoJson[169];
        for (int index = 1; index < 169; index++){
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(new ClassPathResource(Paths.get("data/frame_" + index +".json").toString()).getInputStream(), Charset.forName("UTF-8")))) {
            
                predictedData[index -1] = om.readValue(reader, GeoJson.class);
            }
            catch (IOException e) {
                e.printStackTrace();
            }                        
        }
        epidemicMap.setSimulatedData(predictedData);

        return epidemicMap;
    }
}
