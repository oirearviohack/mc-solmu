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
/*
 * lic class PatientSetGenerator {
    public static final String DATA_PATH = "src/main/resources/";

    public static final String SOURCE_FILE = "patient-examples-cypress-template-dstu3.json";

    public static final String PATIENTS_FILE = "oda-patients.json";

    public static void main(String[] args) throws DataFormatException, IOException {
        final FhirContext ctx = FhirContext.forDstu3();
        final IParser parser = ctx.newJsonParser();
        parser.setPrettyPrint(true);
        Bundle bundle;
        try (BufferedReader reader = Files.newBufferedReader(Paths.get(PatientSetGenerator.DATA_PATH,
                PatientSetGenerator.SOURCE_FILE), Charset.forName("UTF-8"))) {
            bundle = parser.parseResource(Bundle.class, reader);
        }
 */
    public static final String DATA_PATH = "src/main/resources/data";
    @Bean
    public EpidemicMap epidemicMap() {
        /*
         *         try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(new ClassPathResource(Paths.get(sourceFile).toString()).getInputStream(), Charset.forName("UTF-8")))) {
         */
        EpidemicMap epidemicMap = new EpidemicMap(75, 0.55);
        ObjectMapper om = new ObjectMapper();
        //Files.newBufferedReader(Paths.get(DATA_PATH, "frame_0.json"), Charset.forName("UTF-8"));
      //  try(BufferedReader reader = Files.newBufferedReader(Paths.get(DATA_PATH, "frame_0.json"), Charset.forName("UTF-8"))){
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(new ClassPathResource(Paths.get("data/frame_0.json").toString()).getInputStream(), Charset.forName("UTF-8")))) {
       // try(InputStream is = ClassLoader.class.getResourceAsStream("/data/frame_0.json")){
            epidemicMap.setObservedData(om.readValue(reader, GeoJson.class));
            
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        GeoJson[] predictedData = new GeoJson[169];
        for (int index = 1; index < 169; index++){
       //     try(BufferedReader reader = Files.newBufferedReader(Paths.get(DATA_PATH, "frame_" + index + ".json"), Charset.forName("UTF-8"))){
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(new ClassPathResource(Paths.get("data/frame_" + index +".json").toString()).getInputStream(), Charset.forName("UTF-8")))) {
            
                predictedData[index -1] = om.readValue(reader, GeoJson.class);
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
