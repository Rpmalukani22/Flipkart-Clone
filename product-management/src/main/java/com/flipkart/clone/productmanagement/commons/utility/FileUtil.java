/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Tuesday, 4th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
package com.flipkart.clone.productmanagement.commons.utility;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class FileUtil {

    public static File convertMultiPartFileToFile(final MultipartFile multipartFile) {
        final File file = new File(multipartFile.getOriginalFilename());
        try (final FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(multipartFile.getBytes());
        } catch (IOException e) {
            log.error("Error occurred while converting the multipart file");
            e.printStackTrace();
        }
        return file;
    }

    public static String cleanPath(String path, String pathDelim, boolean trailingDelim) {
        if (!path.endsWith(pathDelim))
            path = path + pathDelim;
        path = path.replaceAll("(" + pathDelim + ")" + "+", pathDelim).trim();
        if (!trailingDelim)
            path = path.replaceAll("(" + pathDelim + ")" + "$", "");
        return path;
    }
}
