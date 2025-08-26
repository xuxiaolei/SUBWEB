import './assets/css/index.less';
import { Options } from './types';
import { backendConfig as defaultBackendConfig, externalConfig, targetConfig } from './config';

let subUrl = '';

// 优先从全局变量获取 backendConfig，如果获取不到则使用默认配置
const backendConfig = (() => {
    try {
        // 检查 window 对象是否存在 BACKEND_CONFIG_ENV
        const envBackendConfig = (window as any).BACKEND_CONFIG_ENV;
        //打印环境变量 BACKEND_CONFIG
        console.log('全局变量 BACKEND_CONFIG_ENV:', envBackendConfig);
        if (envBackendConfig) {
            const parsedConfig = JSON.parse(envBackendConfig);
            // 验证解析后的配置是否符合预期格式
            if (Array.isArray(parsedConfig) && parsedConfig.every(item => typeof item === 'object' && 'label' in item && 'value' in item)) {
                return parsedConfig;
            } else {
                console.warn('全局变量 BACKEND_CONFIG_ENV 格式不正确，将使用默认配置。');
            }
        }
    } catch (e) {
        console.error('解析全局变量 BACKEND_CONFIG_ENV 失败，将使用默认配置。', e);
    }
    return defaultBackendConfig;
})();

function copyText(copyStr: string) {
    navigator.clipboard.writeText(copyStr).then(() => {
        layui.layer.msg('复制成功~', { icon: 1 });
    }, () => {
        layui.layer.msg('复制失败, 请手动选择复制', { icon: 2 });
    });
}

function generateSubUrl(data: Options) {
    const backend = data.backend;
    let originUrl = data.url;
    originUrl = encodeURIComponent(originUrl.replace(/(\n|\r|\n\r)/g, '|'));

    let newSubUrl = `${backend}&url=${originUrl}&target=${data.target}`;

    if (data.config) {
        newSubUrl += `&config=${encodeURIComponent(data.config)}`;
    }

    if (data.include) {
        newSubUrl += `&include=${encodeURIComponent(data.include)}`;
    }

    if (data.exclude) {
        newSubUrl += `&wxclude=${encodeURIComponent(data.exclude)}`;
    }

    if (data.name) {
        newSubUrl += `&filename=${encodeURIComponent(data.name)}`;
    }

    newSubUrl += `&emoji=${data.emoji || 'false'}&append_type=${data.append_type || 'false'}&append_info=${data.append_info || 'false'}&scv=${data.scv || 'false'}&udp=${data.udp || 'false'}&list=${data.list || 'false'}&sort=${data.sort || 'false'}&fdn=${data.fdn || 'false'}&insert=${data.insert || 'false'}`;
    subUrl = newSubUrl;
    $('#result').val(subUrl);
    copyText(subUrl);
}

layui.use(['form'], () => {
    const form = layui.form;

    let childrenHtml = '';
    targetConfig.forEach(option => {
        childrenHtml += `<option value="${option.value}">${option.label}</option>`;
    });
    $('#targetSelecter').append(childrenHtml);

    childrenHtml = '';
    externalConfig.forEach(group => {
        let html = '';
        group.options.forEach(option => {
            html += `<option value="${option.value}">${option.label}</option>`;
        });
        childrenHtml += `<optgroup label="${group.label}">${html}</optgroup>`;
    });
    $('#configSelecter').append(childrenHtml);

    childrenHtml = '';
    backendConfig.forEach(option => {
        childrenHtml += `<option value="${option.value}">${option.label}</option>`;
    });
    $('#backendSelecter').append(childrenHtml);
    form.render('select', 'optionsForm');


    form.on('submit(generate)', target => {
        const data = target.field as Options;
        generateSubUrl(data);
    });

    $('#importToClash').on('click', () => {
        if (!subUrl) { return layui.layer.msg('未生成新的订阅链接', { icon: 2 }); }
        const url = `clash://install-config?url=${encodeURIComponent(subUrl)}`;
        window.open(url);
    });
});
