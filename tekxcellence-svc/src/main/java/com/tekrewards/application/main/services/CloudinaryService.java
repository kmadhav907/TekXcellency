package com.tekrewards.application.main.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.Singleton;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private static String CLOUDINARY_CLOUDNAME ="date5n64u"  ;


    private static String CLOUDINARY_APIKEY = "825135479221335" ;


    private static String CLOUDINARY_APISECRET = "eTUqPYCjPh5nAYv3sSU0j5SidS0";

    private Cloudinary cloudinary;

    @Autowired
    public CloudinaryService(){
        cloudinary = Singleton.getCloudinary();
        cloudinary.config.apiKey = CLOUDINARY_APIKEY;
        cloudinary.config.apiSecret = CLOUDINARY_APISECRET;
        cloudinary.config.cloudName = CLOUDINARY_CLOUDNAME;
    }
    public Map upload(Object file, Map options) {
        try {
            return cloudinary.uploader().upload(file, options);
        }
        catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public String createUrl(String name) {
        return cloudinary.url()
                .imageTag(name);
    }

}
