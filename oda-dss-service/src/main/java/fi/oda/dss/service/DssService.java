package fi.oda.dss.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import fi.oda.dss.EpidemicSituation;


@Service
public class DssService {
    private Map<Integer, Map<EpidemicSituation, String>> actions;
    
    private double timestepHours = 2.0;
    
    public DssService(){
        actions = new HashMap<Integer, Map<EpidemicSituation, String>>();
        Map<EpidemicSituation, String> lowRiskGroup =new HashMap<EpidemicSituation, String>();
        lowRiskGroup.put(EpidemicSituation.EXPECTED, "Alueellasi on mahdollisesti alkamassa epidemia %t. Muista pestä kädet säännöllisesti.");
        lowRiskGroup.put(EpidemicSituation.ONGOING, "Alueellasi on meneillään epidemia. Muista pestä kädet säännöllisesti.");
        Map<EpidemicSituation, String> mediumRiskGroup =new HashMap<EpidemicSituation, String>();
        mediumRiskGroup.put(EpidemicSituation.EXPECTED, 
                "Alueellasi on mahdollisesti alkamassa epidemia %t. Muista pestä kädet säännöllisesti ja käyttää käsidesiä.");
        mediumRiskGroup.put(EpidemicSituation.ONGOING, "Alueellasi on meneillään epidemia. Muista pestä kädet säännöllisesti ja käyttää käsidesiä.");    
        Map<EpidemicSituation, String> highRiskGroup =new HashMap<EpidemicSituation, String>();
        highRiskGroup.put(EpidemicSituation.EXPECTED, 
                "Alueellasi on mahdollisesti alkamassa epidemia %t. Muista pestä kädet säännöllisesti ja käyttää käsidesiä. "+
                "Vältä kontaktia sairastuneiden perheenjäsenten kanssa. Oireiden ilmetessä hakeudu lääkärihoitoon.");
        highRiskGroup.put(EpidemicSituation.ONGOING, 
                "Alueellasi on meneillään epidemia. Muista pestä kädet säännöllisesti ja käyttää käsidesiä. "+
                "Vältä kontaktia sairastuneiden perheenjäsenten kanssa. Oireiden ilmetessä hakeudu lääkärihoitoon.");
        
        actions.put(0, lowRiskGroup);
        actions.put(1, mediumRiskGroup);
        actions.put(2, highRiskGroup);
        
    }

    public Optional<String> inferAction(double[] epidemicLevel, int age, int health) {        
        // TODO: use inference engine to determine action
        double currentLevel = findMax(0, 1, epidemicLevel);
        int lastIndex = epidemicLevel.length - 1;
        EpidemicSituation situation = EpidemicSituation.NO_EPIDEMIC;   
        int firstIndex = 0;
        if (currentLevel > 0.5){
            situation = EpidemicSituation.ONGOING;
        }else{
            firstIndex = findFirstOverThreshold(0, lastIndex, epidemicLevel, 0.5);
            if (firstIndex != -1){
                situation = EpidemicSituation.EXPECTED;    
            }
        }
        int riskGroup = 0;
        if (age >= 80 || health < 3){
            riskGroup = 2;
        }else if (age >= 70 || health < 5){
            riskGroup = 1;
        }
        if (situation == EpidemicSituation.NO_EPIDEMIC){
            return Optional.empty();
        }
        SimpleDateFormat format = new SimpleDateFormat("dd.MM.yyyy");
        String message = actions.get(riskGroup).get(situation);
        int hours = (int)(firstIndex * timestepHours);
        Calendar cal = Calendar.getInstance(); // creates calendar
        cal.setTime(new Date()); // sets calendar time/date
        cal.add(Calendar.HOUR_OF_DAY, hours); // adds one hour
        message = message.replace("%t", format.format(cal.getTime()));
        return Optional.of(message);
        
    }
    private double findMax(int startIndex, int endIndex, double[] epidemicLevel){
        if (endIndex >= epidemicLevel.length){
            endIndex = epidemicLevel.length - 1;
        }
        if (startIndex >= epidemicLevel.length){
            startIndex = epidemicLevel.length - 1;
        }
        double max = epidemicLevel[startIndex];
        int i;
        for (i = startIndex; i <= endIndex; i++){
            if (epidemicLevel[i] > max){
                max = epidemicLevel[i];
            }
        }
        return max;
    }
    private int findFirstOverThreshold(int startIndex, int endIndex, double[] epidemicLevel, double threshold){
        if (endIndex >= epidemicLevel.length){
            endIndex = epidemicLevel.length - 1;
        }
        if (startIndex >= epidemicLevel.length){
            startIndex = epidemicLevel.length - 1;
        }      
        int i;
        for (i = startIndex; i <= endIndex; i++){
            if (epidemicLevel[i] > threshold){
                return i;
            }
        }
        return -1;
    }
}
