package fi.oda.dss.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fi.oda.dss.service.EpidemicService;


@RestController
public class DssController {
    private DssService dssService;
    
    
    public DssController(DssService dssService){
        this.dssService = dssService;
    }
    
    @RequestMapping("/")
    public String getDss(@RequestParam String epidemicLevel){
        return "";
    }
}
