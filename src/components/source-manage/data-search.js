const data = [
    {   
        id: 1,
        name: '我的英雄文件夹',
        src: 'http://img3.imgtn.bdimg.com/it/u=816908173,652574552&fm=27&gp=0.jpg',
        type: 'image',
        content: false,
        dir: '/'
    },
    {   
        id: 2,
        name: '漂亮小姐姐',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524135480120&di=2bfe86b5ab5e8ddb22f23164ce1ec83d&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F58461e1468e62.jpg%3Fdown',
        type: 'image',
        dir: '/'
    },
    {   
        id: 3,
        name: '短头发美女',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524135480119&di=6bc28f104c8ab94fca917a2b1dc98602&imgtype=0&src=http%3A%2F%2Fold.bz55.com%2Fuploads%2Fallimg%2F150720%2F139-150H0110935.jpg',
        type: 'folder',
        dir: '/'
    },
    {   
        id: 4,
        name: '清新美女',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524135480119&di=c618f93c18a9c850dbe2cd208eeb9303&imgtype=0&src=http%3A%2F%2Fp2.wmpic.me%2Farticle%2F2016%2F01%2F13%2F1452669823_pCmIOZwM.jpg',
        type: 'folder',
        dir: '/'
    },
    {   
        id: 5,
        name: '校园小清新美女',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524135607463&di=a6a270ef9a4d4b17ff7d2c175834fbc3&imgtype=0&src=http%3A%2F%2Fi2.sanwen.net%2Fdoc%2F1608%2F704-160PQ50421.jpg',
        type: 'image',
        dir: '/'
    },
    {   
        id: 6,
        name: '美女文件夹',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524135674431&di=47b98307086e0a03b8fd2747021798a4&imgtype=0&src=http%3A%2F%2Fpic.yesky.com%2FuploadImages%2F2014%2F336%2F34%2FAPEOU2152G7V.jpg',
        type: 'video',
        content: true,
        dir: '/'
    },
    {   
        id: 7,
        name: '运动美女文件夹',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524135674430&di=0c8cd6f820776803a455d546730a78c2&imgtype=0&src=http%3A%2F%2Fdynamic-image.yesky.com%2F740x-%2FuploadImages%2F2017%2F051%2F40%2FQ9E309PG5007_800x1200.jpg',
        type: 'video',
        content: false,
        dir: '/'
    },
    {
        id: 8,
        name: '性感清新文件夹',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524135674427&di=3b8d2c7840631b41a2bb7da244151d51&imgtype=0&src=http%3A%2F%2Fpic.yesky.com%2FuploadImages%2F2015%2F141%2F12%2FR6F2P2F4U397.jpg',
        type: 'folder',
        content: false,
        dir: '/'       
    },
    {
        id: 9,
        name: '小花',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524135607463&di=6dca9e21431cb8b41b9c975cc64bf3cd&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201303%2F21%2F20130321121333_5danv.thumb.700_0.jpeg',
        type: 'filder',
        content: false,
        dir: '/'       
    },
    {
        id: 9,
        name: '小花',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524135607463&di=6dca9e21431cb8b41b9c975cc64bf3cd&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201303%2F21%2F20130321121333_5danv.thumb.700_0.jpeg',
        type: 'video',
        content: false,
        dir: '/'       
    },
    {
        id: 10,
        name: '小泽',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524135607462&di=ffb041f21496b0d7ace4358c0071d66e&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F114%2Fd%2F42.jpg',
        type: 'image',
        content: false,
        dir: '/'       
    },
    {
        id: 11,
        name: '小仓',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524135607461&di=e2ac43163e44b6e4d3d5f01672825565&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F131%2Fd%2F167.jpg',
        type: 'video',
        content: false,
        dir: '/'       
    },
    {
        id: 12,
        name: '小吉',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524135607460&di=4124a8b3891d2dc3e6f70feb5d7e499f&imgtype=0&src=http%3A%2F%2Fp3.wmpic.me%2Farticle%2F2016%2F05%2F16%2F1463388752_tcEkGyor.jpg',
        type: 'folder',
        content: false,
        dir: '/'       
    },
    {
        id: 13,
        name: '小敏',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524135607456&di=d785e570783ddceb8c122e85d451760f&imgtype=0&src=http%3A%2F%2Fpic2016.5442.com%3A82%2F2016%2F0517%2F9%2F4.jpg%2521960.jpg',
        type: 'image',
        content: false,
        dir: '/'       
    },
    {
        id: 14,
        name: '小雅',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524135607456&di=bd0a2b4ea3a10d259429615b4b44775a&imgtype=0&src=http%3A%2F%2Fimage.tianjimedia.com%2FuploadImages%2F2015%2F141%2F23%2FA5UW1NMS21F9_1000x500.jpg',
        type: 'image',
        content: false,
        dir: '/'       
    },
    {
        id: 15,
        name: '小啦',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524135607454&di=4d0cd3dfceffadb366951ac2010de7ee&imgtype=0&src=http%3A%2F%2Fm4.biz.itc.cn%2Fpic%2Fnew%2Fn%2F27%2F86%2FImg7348627_n.jpg',
        type: 'image',
        content: false,
        dir: '/'       
    },
    {
        id: 16,
        name: '小A',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524135607451&di=8ef2c6cc07c1e53435def4e26ae26095&imgtype=0&src=http%3A%2F%2Fimage.tianjimedia.com%2FuploadImages%2F2015%2F141%2F34%2FIZD308RT72P6_1000x500.jpg',
        type: 'image',
        content: false,
        dir: '/'       
    }
];

export default data;