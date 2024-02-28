/*************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2024 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 **************************************************************************/
import config from '../config.json';
export const getWfLoginCallUrl = (protocalHostPath) => {
    if (config.runmode === "dev") {
        return config.dev.CORS_ANYWHERE_URL+protocalHostPath+config.dev.WF_lOGIN_INFO_REST_PATH;
    }else{
        return protocalHostPath+config.dev.WF_lOGIN_INFO_REST_PATH;
    }
};

export const getWfTaskCallUrl = (protocalHostPath) => {
    if (config.runmode === "dev") {
        return config.dev.CORS_ANYWHERE_URL+protocalHostPath+config.dev.WF_USER_TASKS_REST_PATH;
    }else{
        return protocalHostPath+config.dev.WF_USER_TASKS_REST_PATH;
    }
};