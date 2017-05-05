package fi.oda.dss.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import fi.oda.dss.EpidemicSituation;


@Service
public class DssService {
    private Map<Integer, Map<EpidemicSituation, String>> actions;
    public DssService(){
        actions = new HashMap<Integer, Map<EpidemicSituation, String>>();
        Map<EpidemicSituation, String> lowRiskGroup =new HashMap<EpidemicSituation, String>();
        lowRiskGroup.put(EpidemicSituation.EXPECTED, "Mahdollinen epidemia tulossa. Muista pestä kädet säännöllisesti.");
        lowRiskGroup.put(EpidemicSituation.ONGOING, "Epidemia meneillään. Muista pestä kädet säännöllisesti.");
        Map<EpidemicSituation, String> mediumRiskGroup =new HashMap<EpidemicSituation, String>();
        mediumRiskGroup.put(EpidemicSituation.EXPECTED, 
                "Mahdollinen epidemia tulossa. Muista pestä kädet säännöllisesti ja käyttää käsidesiä.");
        mediumRiskGroup.put(EpidemicSituation.ONGOING, "Epidemia meneillään. Muista pestä kädet säännöllisesti ja käyttää käsidesiä.");    
        Map<EpidemicSituation, String> highRiskGroup =new HashMap<EpidemicSituation, String>();
        highRiskGroup.put(EpidemicSituation.EXPECTED, 
                "Mahdollinen epidemia tulossa. Muista pestä kädet säännöllisesti ja käyttää käsidesiä. Oireiden ilmetessä hakeudu lääkärihoitoon.");
        highRiskGroup.put(EpidemicSituation.ONGOING, 
                "Epidemia meneillään. Muista pestä kädet säännöllisesti ja käyttää käsidesiä. Oireiden ilmetessä hakeudu lääkärihoitoon.");
        
        actions.put(0, lowRiskGroup);
        actions.put(1, mediumRiskGroup);
        actions.put(2, highRiskGroup);
        
    }

    public Optional<String> inferAction(double[] epidemicLevel, int age, int health) {        
        // TODO: use inference engine to determine action
        double currentLevel = findMax(0, 1, epidemicLevel);
        
        EpidemicSituation situation = EpidemicSituation.NO_EPIDEMIC;   
        if (currentLevel > 0.5){
            situation = EpidemicSituation.ONGOING;
        }else if (findMax(0, 10, epidemicLevel) > 0.5){
            situation = EpidemicSituation.EXPECTED;
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
        return Optional.of(actions.get(riskGroup).get(situation));
        
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
    
}
