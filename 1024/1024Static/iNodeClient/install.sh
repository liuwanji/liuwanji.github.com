#!/bin/sh

CURRENT=`pwd`

#check install path
CHECKRESULT=`echo $CURRENT|grep '[^a-zA-Z0-9/(){}_. -]'`
if [ "$CHECKRESULT" != "" ];then
    echo "Invalid iNode client installation directory name. "
    echo "The directory name can contain only upper-case/lower-case English letters, digits, spaces, and the following characters:(){}/._-."
    exit 0
fi

INODE_CFG="/etc/iNode/inodesys.conf"

#[ -r "$INODE_CFG" ] && . "${INODE_CFG}"
if [ -r "$INODE_CFG" ];then
    LINE=`cat $INODE_CFG`
    INSTALL_DIR=${LINE##*INSTALL_DIR=}
fi

if [ "$INSTALL_DIR" != "" ];then
    echo "iNode has been installed on the path $INSTALL_DIR."
    if [ "$INSTALL_DIR" != "$CURRENT" ]  
    then
        echo -n "This operation will remove iNode. Are you sure to continue?[input Y/y to continue]:"
	    read ISCONTINUE    
	    if [ "$ISCONTINUE" != "Y" -a "$ISCONTINUE" != "y" ]; then                   
	        exit 0        
	    fi
	    cd "$INSTALL_DIR"        
	    ./uninstall.sh
	    cd "$CURRENT"
	    INSTALL_DIR=""
    else  
        exit 0
    fi        
fi

IfExistMon=`ps awx -o command|awk -F/ '{print $NF}'|grep -x iNodeMon`
if [ "$IfExistMon" != "" ]
then
    if [ -n "$INSTALL_DIR" ]
    then
        "$INSTALL_DIR/iNodeMon" -k
    fi
        
    Sec=0
    while [ 1 ]
    do
        IfExistMon=`ps awx -o command|awk -F/ '{print $NF}'|grep -x iNodeMon`
	if [ "$IfExistMon" != "" ]
        then
	    sleep 1
	    Sec=`expr $Sec + 1`

	    if [ "$Sec" -gt 10 ]
	    then
	        killall -9 iNodeMon
	    fi
	else
	    break
	fi
    done
fi

IfExistAuth=`ps awx -o command|awk -F/ '{print $NF}'|grep -x AuthenMngService`
if [ "$IfExistAuth" != "" ]
then
    if [ -n "$INSTALL_DIR" ]
    then
        "$INSTALL_DIR/AuthenMngService" -k
    fi
    
    Sec=0
    while [ 1 ]
    do
        IfExistAuth=`ps awx -o command|awk -F/ '{print $NF}'|grep -x AuthenMngService`
	if [ "$IfExistAuth" != "" ]
        then
	    sleep 1
	    Sec=`expr $Sec + 1`

	    if [ "$Sec" -gt 10 ]
	    then
	        killall -9 AuthenMngService
	    fi
	else
	    break
	fi
    done
fi

IfExistUI=`ps awx -o command|awk -F/ '{print $NF}'|grep -x iNodeClient`
if [ "$IfExistUI" != "" ]
then
    sleep 3
    killall -9 iNodeClient
fi

if [ ! -r "/etc/iNode" ]
then
mkdir /etc/iNode
fi

if [ ! -r "./clientfiles" ]
then
mkdir ./clientfiles
fi

if [ ! -r "./conf" ]
then
mkdir ./conf
fi

if [ ! -r "./log" ]
then
mkdir ./log
fi

INODE_CFG="/etc/iNode/inodesys.conf"

#-r "$INODE_CFG" ] && . "${INODE_CFG}"
if [ -r "$INODE_CFG" ];then
    LINE=`cat $INODE_CFG`
    INSTALL_DIR=${LINE##*INSTALL_DIR=}
fi

if [ -z "$INSTALL_DIR" ]; then
    echo INSTALL_DIR=$CURRENT >> /etc/iNode/inodesys.conf
fi

if [ ! -r "/usr/lib/libstdc++.so.5" ]
then
cp -fr ./libs/std/libstdc++.so.5 /usr/lib/
fi

if [ ! -r "/usr/lib/libstdc++.so.6" ]
then
cp -fr ./libs/std/libstdc++.so.6 /usr/lib/
fi

cp -fr ./libs/wxWidgets/* /usr/lib/
cp -fr ./libs/ace/* /usr/lib/
cp -fr ./libs/opswat/* /usr/lib/

sed -i "s:@INSTALL_PATH:$CURRENT:g" ./iNodeClient.desktop
sed -i "s:@INSTALL_PATH:$CURRENT:g" ./iNodeClient.sh

chmod 755 ./AuthenMngService
chmod 755 ./renew.ps
chmod 755 ./enablecards.ps
chmod 755 ./iNodeClient.desktop
chmod 755 ./iNodeClient.sh

OS_UBUNTU=`cat /etc/issue | grep 'Ubuntu'`
OS_FEDORA=`cat /etc/issue | grep 'Fedora'`

if [ "$OS_FEDORA" != "" ]
then
    export PATH=$PATH:/sbin
fi

if [ "$OS_UBUNTU" != "" ]
then
iNODE_SERVICE=`cat /etc/rc.local | grep 'iNodeAuthService'`
if [ "$iNODE_SERVICE" = "" ]
then
mv -f ./iNodeAuthService_ubuntu /etc/init.d/iNodeAuthService
chmod 755 /etc/init.d/iNodeAuthService
rm -f ./iNodeAuthService
cp -fr /etc/rc.local /etc/rc.local.bak
sed -e '/^exit 0$/d' /etc/rc.local > /etc/rc.temp
echo "/etc/init.d/iNodeAuthService start" >> /etc/rc.temp
echo "exit 0" >> /etc/rc.temp
mv -f /etc/rc.temp /etc/rc.local
chmod 755 /etc/rc.local
fi
if [ ! -r "/usr/lib/libtiff.so.3" ]
then
ln -s /usr/lib/libtiff.so.4 /usr/lib/libtiff.so.3
fi
> ./enablecards.ps
update-rc.d iNodeAuthService defaults 80 01  > /dev/null 2>&1
else
mv -f ./iNodeAuthService /etc/init.d
chmod 755 /etc/init.d/iNodeAuthService
rm -f ./iNodeAuthService_ubuntu
chkconfig --add iNodeAuthService
chkconfig --level 35 iNodeAuthService on
chkconfig --level 01246 iNodeAuthService off
fi

SELINUX_FLAG=`getenforce 2>/dev/null | grep -x -i enforcing`
if [ "$SELINUX_FLAG" != "" ]
then
chcon -t textrel_shlib_t /usr/lib/libCoreUtils.so
chcon -t textrel_shlib_t /usr/lib/libImplAv.so
chcon -t textrel_shlib_t /usr/lib/libOesisCore.so
fi

if [ "$OS_UBUNTU" != "" ];then
    if [ -d "/var/lib/locales/supported.d/" ];then
	    if [  ! -f "/var/lib/locales/supported.d/zh-inode" ];then
	        echo "zh_CN.GB2312 GB2312" > /var/lib/locales/supported.d/zh-inode
	        locale-gen > /dev/null 2>&1
	    fi
	fi
fi
 

rm -f ./install.sh

service iNodeAuthService start
