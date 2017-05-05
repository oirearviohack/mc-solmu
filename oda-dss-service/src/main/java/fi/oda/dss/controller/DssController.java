package fi.oda.dss.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import fi.oda.dss.DssParameters;
import fi.oda.dss.service.DssService;


@RestController
public class DssController {
    private DssService dssService;
    
    
    public DssController(DssService dssService){
        this.dssService = dssService;
    }
    
    @PostMapping("/dss")
    public Map<Boolean, String> getDss(@RequestBody DssParameters dssParameters){
        Optional<String> action = dssService.inferAction(dssParameters.epidemicLevel, 
                                      dssParameters.age, 
                                      dssParameters.healthLevel);
        Map<Boolean, String> result = new HashMap<Boolean, String>();
        if (action.isPresent()){
            result.put(true, action.get());
        }else{
            result.put(false, "");
        }
        return result;
    }
}
