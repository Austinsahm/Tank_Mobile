import { DeviceAttribute } from "../model/company";
import { DeviceAttributeStatus, devicesLogDetails } from "../model/device";



export const changeAttributeValue = (
    att: DeviceAttribute | devicesLogDetails
  ): string => {
    if (att.attributeType == "1") {
      if (att.attribute === DeviceAttributeStatus.doorStatus) {
        if (att.attributeValue === "1") return "Opened";
        return "Closed";
      }
      if (att.attribute === DeviceAttributeStatus.WaterLeakageStatus) {
        if (att.attributeValue === "1") return "Leaking";
        return "Not Leaking";
      }
    }
    return att.attributeValue;
  };