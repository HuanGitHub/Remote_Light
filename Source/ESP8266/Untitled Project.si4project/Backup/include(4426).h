#ifndef __INCLUDE_H
#define __INCLUDE_H

#include "ets_sys.h"
#include "osapi.h"
#include "uart.h"
//#include "../driver/hw_timer.c"
#include "user_interface.h"
#include "gpio.h"
#include "eagle_soc.h"
#include "espconn.h"
#include "ip_addr.h"
#include "c_types.h"
#include "mem.h"
#include "IO.h"
#include "wifi.h"
#include "TCP_server.h"
#include "TCP_client.h"
#include "OneNet.h"
void use_Timer(os_timer_t *timer,os_timer_func_t *pfunction,void *parg,int t,char re_falg);
#endif


