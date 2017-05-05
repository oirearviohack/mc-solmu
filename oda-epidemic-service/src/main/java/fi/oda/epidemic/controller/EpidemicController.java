package fi.oda.epidemic.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fi.oda.epidemic.service.EpidemicService;


@RestController
public class EpidemicController {
    private EpidemicService epidemicService;
    
    
    public EpidemicController(EpidemicService epidemicService){
        this.epidemicService = epidemicService;
    }
    @CrossOrigin
    @RequestMapping("/epidemic-level")
    public String getEpidemicLevel(@RequestParam String lat, @RequestParam String lon, @RequestParam String t){
        double latitude = Double.parseDouble(lat);
        double longitude = Double.parseDouble(lon);
        int time = Integer.parseUnsignedInt(t);
        return String.valueOf(epidemicService.calcEpidemicLevel(latitude, longitude, time));
    }
}
